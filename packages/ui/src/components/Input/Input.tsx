import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

import { cn } from '../../lib/cn';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  containerClassName?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      className,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hasError = Boolean(error);

    return (
      <div className={cn('w-full space-y-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled || loading}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              'w-full rounded-lg border bg-white px-3 py-3 text-md',
              'transition-colors outline-none',
              'placeholder:text-gray-400',
              'focus:ring-2 focus:ring-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              leftIcon && 'pl-10',
              (rightIcon || loading) && 'pr-10',

              hasError
                ? ['border-red-500', 'focus:border-red-500', 'focus:ring-red-500'].join(' ')
                : ['border-gray-300', 'focus:border-blue-500'].join(' '),

              'dark:border-gray-700',
              'dark:bg-gray-900',
              'dark:text-white',

              className,
            )}
            {...props}
          />

          {loading ? (
            <div className="absolute inset-y-0 right-3 flex items-center">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.25"
                />
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>
          ) : (
            rightIcon && (
              <div className="absolute inset-y-0 right-3 flex items-center">{rightIcon}</div>
            )
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
