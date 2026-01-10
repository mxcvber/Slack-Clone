import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

interface FormInputProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  placeholder: string
  disabled: boolean
  transform?: (value: string) => string
  autoFocus?: boolean
  type?: string
}

const FormInput = <TFieldValues extends FieldValues>({
  control,
  name,
  placeholder,
  disabled,
  transform,
  autoFocus = false,
  type = 'text',
}: FormInputProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              autoFocus={autoFocus}
              disabled={disabled}
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={(e) => {
                const value = transform ? transform(e.target.value) : e.target.value
                field.onChange(value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
