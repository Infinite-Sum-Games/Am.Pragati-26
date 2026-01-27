import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ResetPasswordFormValues, resetPasswordSchema } from '@/types/resetPasswordTypes';
import RetroWindowWrapper from '@/components/RetroWindowWrapper';

interface ResetPasswordFormProps {
    onSubmit: (values: { email: string; password: string }) => void;
    isSubmitting: boolean;
}

export function ResetPasswordForm({
    onSubmit,
    isSubmitting,
}: ResetPasswordFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <RetroWindowWrapper className="w-full max-w-md mx-auto" title="RESET PASSWORD">
            <div className="text-center mb-4">
                <h1 className="text-white text-xl tracking-widest" style={{ fontFamily: '"Press Start 2P", cursive' }}>RESET</h1>
            </div>
            <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit((values) =>
                    onSubmit({ email: values.email, password: values.password }),
                )}
                noValidate
                style={{ fontFamily: '"Press Start 2P", cursive' }}
            >
                {/* Email Input */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email" className="text-white text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }}>EMAIL ADDRESS</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        {...register('email')}
                        disabled={isSubmitting}
                        className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] text-[10px]"
                        style={{ fontFamily: '"Press Start 2P", cursive' }}
                    />
                    {errors.email && <p className="text-destructive text-[8px]">{errors.email.message}</p>}
                </div>

                {/* Password Inputs (with Eye Toggle) */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password" className="text-white text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }}>NEW PASSWORD</Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            disabled={isSubmitting}
                            className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
                            style={{ fontFamily: '"Press Start 2P", cursive' }}
                            placeholder="........"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-[#a855f7]/60 hover:text-[#a855f7]"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </Button>
                    </div>
                    {errors.password && <p className="text-destructive text-[8px]">{errors.password.message}</p>}
                </div>

                {/* Confirm Password Inputs */}
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="confirmPassword" className="text-white text-[10px]" style={{ fontFamily: '"Press Start 2P", cursive' }}>CONFIRM PASSWORD</Label>
                    <div className="relative">
                        <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            {...register('confirmPassword')}
                            disabled={isSubmitting}
                            className="bg-black/40 border-[#7e22ce]/40 text-white placeholder:text-white/20 focus:border-[#a855f7] focus:ring-[#a855f7] pr-10 text-[10px]"
                            style={{ fontFamily: '"Press Start 2P", cursive' }}
                            placeholder="........"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-[#a855f7]/60 hover:text-[#a855f7]"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-destructive text-[8px]">{errors.confirmPassword.message}</p>}
                </div>

                <Button
                    type="submit"
                    className="w-full bg-[#7e22ce] hover:bg-[#9333ea] text-white font-bold py-2 mt-2 text-xs"
                    disabled={isSubmitting}
                    style={{ fontFamily: '"Press Start 2P", cursive' }}
                >
                    {isSubmitting ? <><Loader2 className="animate-spin mr-2 h-3 w-3" /> RESETTING...</> : 'RESET PASSWORD'}
                </Button>
            </form>
        </RetroWindowWrapper>
    );
}
