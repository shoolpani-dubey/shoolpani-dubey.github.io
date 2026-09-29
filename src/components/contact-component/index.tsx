import { FormEvent, useRef, useState } from 'react';

// Google Form "Contact Me". Entry IDs come from the form's public page; update them if the form's questions change.
// The form must collect email addresses as "Responder input": "Verified" needs a Google sign-in and rejects these posts.
const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdYeeaWiw7uqxy0qtWErC_lBlQkKZQRY8dvLGE262R_sJHeSQ';
const ENTRY_SUBJECT = 'entry.539670770';
const ENTRY_BODY = 'entry.1906432155';

type Field = 'name' | 'email' | 'subject' | 'message';
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: Record<Field, string>) => {
    const errors: Partial<Record<Field, string>> = {};
    if (!values.email.trim()) {
        errors.email = 'Enter your email address so I can reply.';
    } else if (!EMAIL_PATTERN.test(values.email.trim())) {
        errors.email = 'Enter an email address like name@example.com.';
    }
    if (!values.subject.trim()) {
        errors.subject = 'Enter a subject.';
    }
    if (!values.message.trim()) {
        errors.message = 'Enter a message.';
    }
    return errors;
};

const readValues = (form: HTMLFormElement): Record<Field, string> => {
    const data = new FormData(form);
    return {
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        subject: String(data.get('subject') ?? ''),
        message: String(data.get('message') ?? ''),
    };
};

const ErrorIcon = () => <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v5M10 13.5v.5"/></svg>;
const SuccessIcon = () => <svg className="tp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="m6.5 10 2.5 2.5 4.5-5"/></svg>;

export default function ContactComponent(){
    const formRef = useRef<HTMLFormElement>(null);
    const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
    const [status, setStatus] = useState<Status>('idle');

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === 'sending') {
            return;
        }
        const values = readValues(event.currentTarget);
        const nextErrors = validate(values);
        setErrors(nextErrors);
        const firstInvalid = (['email', 'subject', 'message'] as Field[]).find((f) => nextErrors[f]);
        if (firstInvalid) {
            formRef.current?.querySelector<HTMLElement>(`#contact-${firstInvalid}`)?.focus();
            return;
        }

        // The sender's details also go at the top of the body, so they show in the response even if email collection is off.
        const from = values.name.trim() ? `${values.name.trim()} <${values.email.trim()}>` : values.email.trim();
        const payload = new URLSearchParams({
            emailAddress: values.email.trim(),
            [ENTRY_SUBJECT]: values.subject.trim(),
            [ENTRY_BODY]: `From: ${from}\n\n${values.message.trim()}`,
        });

        setStatus('sending');
        try {
            // Google Forms sends no CORS headers: the response is opaque, so only a network failure is detectable.
            await fetch(`${FORM_URL}/formResponse`, { method: 'POST', mode: 'no-cors', body: payload });
            formRef.current?.reset();
            setStatus('sent');
        } catch {
            setStatus('error');
        }
    };

    const fieldProps = (field: Field, hint?: boolean) => ({
        id: `contact-${field}`,
        name: field,
        'aria-invalid': errors[field] ? true : undefined,
        'aria-describedby': [hint ? `contact-${field}-hint` : '', errors[field] ? `contact-${field}-error` : ''].filter(Boolean).join(' ') || undefined,
        // Once a field has shown an error, re-check it as it's edited so the message clears when it's fixed.
        // (Not on blur: removing the message there shifts the Send button out from under the pointer mid-click.)
        onChange: () => {
            if (errors[field] && formRef.current) {
                const next = validate(readValues(formRef.current))[field];
                setErrors((e) => ({ ...e, [field]: next }));
            }
        },
    });

    const fieldError = (field: Field) => errors[field] && <p className="tp-field__error" id={`contact-${field}-error`}><ErrorIcon />{errors[field]}</p>;

    return <div className="site-contact">
        <p className="site-prose">Have a project, a role or a question in mind? Send me a message and I’ll get back to you.</p>

        <form ref={formRef} className="tp-form" noValidate onSubmit={onSubmit} onInput={() => status !== 'sending' && setStatus('idle')}>
            <div className="site-contact__row">
                <div className="tp-field">
                    <label className="tp-field__label" htmlFor="contact-name">Name <span className="tp-field__optional">(optional)</span></label>
                    <input className="tp-input" type="text" autoComplete="name" {...fieldProps('name')} />
                </div>
                <div className="tp-field">
                    <label className="tp-field__label" htmlFor="contact-email">Email address</label>
                    <p className="tp-field__hint" id="contact-email-hint">Only used to reply to you.</p>
                    <input className="tp-input" type="email" autoComplete="email" placeholder="name@example.com" {...fieldProps('email', true)} />
                    {fieldError('email')}
                </div>
            </div>
            <div className="tp-field">
                <label className="tp-field__label" htmlFor="contact-subject">Subject</label>
                <input className="tp-input" type="text" {...fieldProps('subject')} />
                {fieldError('subject')}
            </div>
            <div className="tp-field">
                <label className="tp-field__label" htmlFor="contact-message">Message</label>
                <textarea className="tp-input" rows={6} {...fieldProps('message')} />
                {fieldError('message')}
            </div>

            <div>
                {status === 'sending'
                    ? <button className="tp-button tp-button--primary" type="submit" data-state="busy" aria-disabled="true">
                        <span className="tp-button__spinner" aria-hidden="true"></span>Sending message…
                    </button>
                    : <button className="tp-button tp-button--primary" type="submit">Send message</button>}
            </div>
        </form>

        <div className="site-contact__feedback">
            <div role="status">
                {status === 'sent' && <div className="tp-alert tp-alert--success">
                    <SuccessIcon />
                    <div className="tp-alert__content">
                        <p className="tp-alert__title">Message sent</p>
                        <p className="tp-alert__body">Thanks for getting in touch. I’ll reply to the email address you gave.</p>
                    </div>
                </div>}
            </div>
            <div role="alert">
                {status === 'error' && <div className="tp-alert tp-alert--danger">
                    <svg className="tp-alert__icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v5M10 13.5v.5"/></svg>
                    <div className="tp-alert__content">
                        <p className="tp-alert__title">Message not sent</p>
                        <p className="tp-alert__body">Check your connection and try again. Your message is still in the form. You can also use the <a href={`${FORM_URL}/viewform`} target="_blank" rel="noreferrer">Google Form</a> or email <a href="mailto:shool.pani.dubey@gmail.com">shool.pani.dubey@gmail.com</a>.</p>
                    </div>
                </div>}
            </div>
        </div>
    </div>;
}
