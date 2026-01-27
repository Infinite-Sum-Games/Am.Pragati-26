
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import RetroWindowWrapper from '../RetroWindowWrapper';

// Define schema
const signUpSchema = z.object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits' }),
    isAmritaStudent: z.boolean(),
    collegeName: z.string().optional(),
    collegeCity: z.string().optional(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
}).refine((data) => {
    if (!data.isAmritaStudent && (!data.collegeName || !data.collegeCity)) {
        return false;
    }
    return true;
}, {
    message: "College details are required",
    path: ["collegeName"] // Highlight college name, could be both
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormDesktopProps {
    onSubmit: (data: SignUpFormData) => void;
    isSubmitting: boolean;
}

const SignUpFormDesktop = ({ onSubmit, isSubmitting }: SignUpFormDesktopProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            fullName: '',
            email: '',
            phone: '',
            isAmritaStudent: false,
            collegeName: '',
            collegeCity: '',
            password: '',
            confirmPassword: '',
        },
    });

    const isAmritaStudent = form.watch('isAmritaStudent');

    return (
        <RetroWindowWrapper className="w-full max-w-xl mx-auto hidden md:block" title="">
            <div className="text-center mb-4 -mt-4">
                <p className="text-white text-xl tracking-widest" style={{ fontFamily: '"Press Start 2P", cursive' }}>SIGN UP</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[10px]">NAME</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your full name" {...field} className="text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }} />
                                    </FormControl>
                                    <FormMessage className="text-[8px] text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[10px]">EMAIL ADDRESS</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} className="text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }} />
                                    </FormControl>
                                    <FormMessage className="text-[8px] text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white text-[10px]">PHONE NUMBER</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} className="text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }} />
                                    </FormControl>
                                    <FormMessage className="text-[8px] text-red-500" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isAmritaStudent"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-sm border border-[#7e22ce]/40 p-3 bg-black/40">
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={field.onChange}
                                            className="h-3 w-3 rounded border-[#7e22ce] text-[#7e22ce] focus:ring-[#a855f7] bg-black accent-[#7e22ce]"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-white text-[10px]">
                                            Are you from Amrita Coimbatore?
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* College Info */}
                        {!isAmritaStudent && (
                            <div className="grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="collegeName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white text-[10px]">COLLEGE NAME</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter college name" {...field} className="text-[10px] pt-3" style={{ fontFamily: '"Press Start 2P", cursive' }} />
                                            </FormControl>
                                            <FormMessage className="text-[8px] text-red-500" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="collegeCity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white text-[10px]">COLLEGE CITY</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter college city" {...field} className="text-[10px] pt-3" style={{ fontFamily: '"Press Start 2P", cursive' }} />
                                            </FormControl>
                                            <FormMessage className="text-[8px] text-red-500" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-[10px]">PASSWORD</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter password"
                                                    {...field}
                                                    className="pr-8 text-[10px]"
                                                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
                                                >
                                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[8px] text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-[10px]">CONFIRM PASSWORD</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm password"
                                                    {...field}
                                                    className="pr-8 text-[10px]"
                                                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[8px] text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full font-bold py-2 mt-6 text-xs bg-[#7e22ce] hover:bg-[#9333ea]"
                        disabled={isSubmitting}
                        style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                        {isSubmitting ? '...' : 'SIGN UP'}
                    </Button>

                    <div className="text-center text-[10px] text-white/60">
                        Already registered?{' '}
                        <Link to="/login" className="text-[#a855f7] hover:text-[#d8b4fe] hover:underline font-bold">
                            Login
                        </Link>
                    </div>
                </form >
            </Form >
        </RetroWindowWrapper >
    );
};

export default SignUpFormDesktop;
