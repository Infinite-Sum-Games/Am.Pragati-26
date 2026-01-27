
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react';
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

// Define schema (same as desktop)
const signUpSchema = z.object({
    fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phone: z.string().min(10, { message: 'Invaid phone number' }),
    isAmritaStudent: z.boolean(),
    collegeName: z.string().optional(),
    collegeCity: z.string().optional(),
    password: z.string().min(8, { message: 'Password should be minimum of 8 characters' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Enter the same password",
    path: ["confirmPassword"],
}).superRefine((data, ctx) => {
    if (!data.isAmritaStudent) {
        if (!data.collegeName) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please enter your college name",
                path: ["collegeName"],
            });
        }
        if (!data.collegeCity) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please enter your college city",
                path: ["collegeCity"],
            });
        }
    }
});

type SignUpFormData = z.infer<typeof signUpSchema>;

interface SignUpFormMobileProps {
    onSubmit: (data: SignUpFormData) => void;
    isSubmitting: boolean;
}

const steps = [
    { id: 1, title: "Personal" },
    { id: 2, title: "College" },
    { id: 3, title: "Crypto" }, // Using "Crypto" as a cool name for Password/Security
];

const SignUpFormMobile = ({ onSubmit, isSubmitting }: SignUpFormMobileProps) => {
    const [currentStep, setCurrentStep] = useState(1);
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
        mode: 'onChange'
    });

    const isAmritaStudent = form.watch('isAmritaStudent');

    const nextStep = async () => {
        let isValid = false;
        if (currentStep === 1) {
            isValid = await form.trigger(['fullName', 'email', 'phone', 'isAmritaStudent']);
        } else if (currentStep === 2) {
            isValid = await form.trigger(['collegeName', 'collegeCity']);
        }

        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, 3));
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    return (

        <RetroWindowWrapper className="w-full max-w-md mx-auto block md:hidden" title="">
            <div className="text-center mb-6">
                <h1 className="text-white text-2xl tracking-widest mb-2" style={{ fontFamily: '"Press Start 2P", cursive' }}>SIGN UP</h1>
                <p className="text-[#d8b4fe] text-[10px] tracking-widest" style={{ fontFamily: '"Press Start 2P", cursive' }}>STEP {currentStep} OF 3</p>
            </div>

            {/* Progress Bar */}
            <div className="flex justify-between mb-6 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full"></div>
                <div
                    className="absolute top-1/2 left-0 h-1 bg-[#7e22ce] -z-10 -translate-y-1/2 rounded-full transition-all duration-300 shadow-[0_0_5px_#7e22ce]"
                    style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
                ></div>

                {steps.map((step) => (
                    <div
                        key={step.id}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${step.id <= currentStep
                            ? 'bg-[#7e22ce] text-white shadow-[0_0_10px_#7e22ce]'
                            : 'bg-black/40 text-white/40 border border-[#7e22ce]/30'
                            }`}
                        style={{ fontFamily: '"Press Start 2P", cursive' }}
                    >
                        {step.id}
                    </div>
                ))}
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" style={{ fontFamily: '"Press Start 2P", cursive' }}>

                    {/* Step 1: Personal Info */}
                    {currentStep === 1 && (
                        <div className="space-y-4 form-reveal-animation">
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
                                            <Input placeholder="Enter your email address" {...field} className="text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }} />
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
                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border border-[#7e22ce]/40 px-3 h-10 bg-black/40">
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e.target.checked);
                                                    if (e.target.checked) {
                                                        form.setValue('collegeName', 'Amrita Vishwa Vidyapeetham', { shouldValidate: true });
                                                        form.setValue('collegeCity', 'Coimbatore', { shouldValidate: true });
                                                    } else {
                                                        form.setValue('collegeName', '', { shouldValidate: true });
                                                        form.setValue('collegeCity', '', { shouldValidate: true });
                                                    }
                                                }}
                                                className="h-4 w-4 rounded border-[#7e22ce] text-[#7e22ce] focus:ring-[#a855f7] bg-black accent-[#7e22ce]"
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
                        </div>
                    )}

                    {/* Step 2: College Info */}
                    {currentStep === 2 && (
                        <div className="space-y-4 form-reveal-animation">
                            <FormField
                                control={form.control}
                                name="collegeName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-[10px]">COLLEGE NAME</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your college name"
                                                {...field}
                                                className={`text-[10px] ${isAmritaStudent ? 'text-white/50' : 'text-white'}`}
                                                style={{ fontFamily: '"Press Start 2P", cursive' }}
                                            />
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
                                            <Input
                                                placeholder="Enter your college city"
                                                {...field}
                                                className={`text-[10px] ${isAmritaStudent ? 'text-white/50' : 'text-white'}`}
                                                style={{ fontFamily: '"Press Start 2P", cursive' }}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-[8px] text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {/* Step 3: Password */}
                    {currentStep === 3 && (
                        <div className="space-y-4 form-reveal-animation">
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
                                                    placeholder="Enter your password"
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
                                                    placeholder="Confirm your password"
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
                    )}

                    <div className="flex justify-between mt-6">
                        {currentStep > 1 && (
                            <Button type="button" variant="outline" onClick={prevStep} className="bg-transparent border-[#7e22ce]/50 text-white hover:bg-[#7e22ce]/20 hover:text-white text-[8px] h-8 px-4" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                                <ChevronLeft className="mr-1 h-3 w-3" /> BACK
                            </Button>
                        )}

                        {currentStep < 3 ? (
                            <Button type="button" onClick={nextStep} className="ml-auto bg-[#7e22ce] hover:bg-[#9333ea] text-white text-[8px] h-8 px-4" style={{ fontFamily: '"Press Start 2P", cursive' }}>
                                NEXT <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="ml-auto font-bold bg-[#7e22ce] hover:bg-[#9333ea] text-[8px] h-8 px-4"
                                style={{ fontFamily: '"Press Start 2P", cursive' }}
                            >
                                {isSubmitting ? '...' : 'SIGN UP'}
                            </Button>
                        )}
                    </div>

                    <div className="text-center text-[10px] text-white/50 mt-1">
                        Already registered?{' '}
                        <Link to="/login" className="text-[#a855f7] hover:underline hover:text-[#d8b4fe]">
                            Login
                        </Link>
                    </div>
                </form>
            </Form>
        </RetroWindowWrapper>
    );
};

export default SignUpFormMobile;
