'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Rocket } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { LoginSchema } from '@/lib/schemas';
import { loginSchema } from '@/lib/schemas';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [language, setLanguage] = React.useState('en');

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginSchema) => {
    // Mock login logic
    console.log('Login data:', data);
    toast({
      title: 'Login Successful',
      description: 'Welcome back!',
    });
    const dashboardPath = language === 'ne' ? '/dashboard-nepali' : '/dashboard';
    router.push(dashboardPath);
  };

  return (
    <Card>
      <CardHeader className="items-center text-center">
        <div className="flex justify-center items-center gap-2 mb-2">
            <Rocket className="w-8 h-8 text-primary" />
            <CardTitle className="text-3xl font-bold font-headline">SwiftStudy</CardTitle>
        </div>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <FormLabel>Language</FormLabel>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ne">नेपाली (Nepali)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              Login
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline text-primary hover:text-primary/80">
            Create a new account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
