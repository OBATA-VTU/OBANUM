import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-slate-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-10">Privacy Policy</h1>
        
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
                <p className="mb-4">At Obanum, we prioritize your anonymity. We explicitly <strong>do not</strong> collect:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600">
                    <li>Your personal phone number</li>
                    <li>Your real name or physical address</li>
                    <li>Credit card information (as our service is free)</li>
                </ul>
                <p className="mt-4">We may collect basic technical data such as IP addresses and browser types for security purposes and to prevent abuse of our API.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. SMS Content Visibility</h2>
                <p>Please be aware that Obanum is a <strong>public</strong> service. Any SMS message sent to our temporary numbers can be viewed by anyone on the website. Do not use our numbers for:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                    <li>Banking or financial transactions</li>
                    <li>Receiving sensitive personal information</li>
                    <li>Private conversations</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Retention</h2>
                <p>SMS messages are stored on our servers for a limited time (typically 24-48 hours) to facilitate verification. After this period, messages are automatically deleted from our system.</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-slate-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-10">Terms of Service</h1>
        
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
                <p>By accessing and using Obanum, you accept and agree to be bound by the terms and provision of this agreement.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use of Service</h2>
                <p>You agree to use Obanum only for lawful purposes. You are strictly prohibited from using our numbers for:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 mt-2">
                    <li>Illegal activities or fraud</li>
                    <li>Harassment or spamming</li>
                    <li>Registering accounts in violation of third-party platforms' terms</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Disclaimer of Warranties</h2>
                <p>The service is provided on an "as is" and "as available" basis. Obanum makes no warranties that the service will meet your requirements, be uninterrupted, timely, secure, or error-free.</p>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Limitation of Liability</h2>
                <p>Obanum shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your access to or use of, or inability to access or use, the services.</p>
            </section>
        </div>
      </div>
    </div>
  );
};