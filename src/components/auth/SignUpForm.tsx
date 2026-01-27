import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import RetroWindowWrapper from '@/components/RetroWindowWrapper';
import { type SignUpFormValues } from '@/types/signUpTypes';
import { cn } from '@/lib/utils'; // For tailwind class merging

interface SignUpFormProps {
  form: UseFormReturn<SignUpFormValues>;
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  isSubmitting: boolean;
  is_amrita_student: boolean;
  onSubmit: (values: SignUpFormValues) => void;
}

const pixelFont = {
  fontFamily: '"Press Start 2P", cursive',
};

const SignUpForm = ({
  form,
  step,
  nextStep,
  prevStep,
  isSubmitting,
  is_amrita_student,
  onSubmit,
}: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <RetroWindowWrapper className="w-full max-w-xl mx-auto" title="">
      <div className="text-center mb-4">
        <h1
          className="text-white text-2xl tracking-widest"
          style={pixelFont}
        >
          SIGN UP
        </h1>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-gray-600/30 h-3 md:h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#d8b4fe] h-full transition-all duration-300"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
        <span className="text-xs md:text-sm text-white/50" style={pixelFont}>
          {step + 1}/3
        </span>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Step 0: Basic Information */}
        {step === 0 && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    NAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                      placeholder="Enter your full name"
                      style={pixelFont}
                    />
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
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    EMAIL
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                      placeholder="Enter your email"
                      style={pixelFont}
                    />
                  </FormControl>
                  <FormMessage className="text-[8px] text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    PHONE NUMBER
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                      placeholder="Enter your phone number"
                      style={pixelFont}
                    />
                  </FormControl>
                  <FormMessage className="text-[8px] text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_amrita_student"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="mr-2 h-4 w-4 shrink-0 cursor-pointer rounded-sm border border-[#7e22ce]/40 bg-black/40 text-[#a855f7] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#a855f7] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#a855f7]"
                      style={{ transform: 'scale(1.2)' }}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel
                      className="text-white text-sm cursor-pointer"
                      style={pixelFont}
                    >
                      Are you from Amrita Coimbatore?
                    </FormLabel>
                    <FormMessage className="text-[8px] text-red-500" />
                  </div>
                </FormItem>
              )}
            />
          </>
        )}

        {/* Step 1: College Information */}
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="college_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    COLLEGE NAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                      placeholder="Enter your college name"
                      style={pixelFont}
                      disabled={is_amrita_student}
                    />
                  </FormControl>
                  <FormMessage className="text-[8px] text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="college_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    COLLEGE CITY
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                      placeholder="Enter your college city"
                      style={pixelFont}
                      disabled={is_amrita_student}
                    />
                  </FormControl>
                  <FormMessage className="text-[8px] text-red-500" />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Step 2: Password Information */}
        {step === 2 && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    PASSWORD
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
                        placeholder="Enter your password"
                        style={pixelFont}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  <FormLabel className="text-white text-[10px]" style={pixelFont}>
                    CONFIRM PASSWORD
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
                        placeholder="Confirm your password"
                        style={pixelFont}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/60 hover:text-[#a855f7]"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-[8px] text-red-500" />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 gap-2">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="w-full bg-[#3b0764] hover:bg-[#4c0d75] text-[#d8b4fe] border-[#a855f7] font-bold py-2 text-xs"
              style={pixelFont}
            >
              BACK
            </Button>
          )}

          {step < 2 ? (
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextStep();
              }}
              className={cn(
                "w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 text-xs",
                step === 0 && "ml-auto", // Push next button to right if no back button
              )}
              style={pixelFont}
            >
              NEXT
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 text-xs"
              style={pixelFont}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  SUBMITTING...
                </>
              ) : (
                'SIGN UP'
              )}
            </Button>
          )}
        </div>
      </form>
      <div className="text-center text-[10px] text-white/50 mt-4" style={pixelFont}>
        Already have an account?{' '}
        <Link to="/login" className="text-[#a855f7] hover:text-[#d8b4fe] hover:underline font-bold">
          LOG IN
        </Link>
      </div>
    </RetroWindowWrapper>
  );
};

export default SignUpForm;
