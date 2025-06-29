import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </main>
  );
}
