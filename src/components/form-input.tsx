import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Control } from 'react-hook-form'

interface FormInputProps {
  control: Control<any>
  name: string
  placeholder: string
  disabled: boolean
  onChange?: boolean
  autoFocus?: boolean
  type?: string
}

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  placeholder,
  disabled,
  onChange,
  autoFocus = false,
  type = 'text',
}) => {
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
              //TODO: Change
              onChange={
                onChange
                  ? (e) => {
                      const value = e.target.value.replace(/\s+/g, '-').toLowerCase()
                      field.onChange(value)
                    }
                  : field.onChange
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
