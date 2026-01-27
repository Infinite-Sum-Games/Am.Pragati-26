import { createFileRoute } from '@tanstack/react-router'
import SignUpForm from '@/components/auth/SignUpForm' // Updated import
import { useSignUp } from '@/hooks/useSignUp' // Updated import path
import { Form } from '@/components/ui/form'; // Import Form component

export const Route = createFileRoute("/signup/")({
	component: SignupPage,
});

function SignupPage() {
  const {
    form,
    step,
    nextStep,
    prevStep,
    isPending,
    is_amrita_student,
    onSubmit,
  } = useSignUp(); // Destructure all necessary props

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-black">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
      <Form {...form}> {/* Wrap with FormProvider */}
        <SignUpForm
          form={form}
          step={step}
          nextStep={nextStep}
          prevStep={prevStep}
          isSubmitting={isPending}
          is_amrita_student={is_amrita_student}
          onSubmit={onSubmit}
        />
      </Form>
    </div>
  )
}
