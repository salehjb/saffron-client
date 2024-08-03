import { FC } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface ErrorTextProps {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const ErrorText: FC<ErrorTextProps> = ({ error }) => {
  return (
    <>{error && <p className="text-sm text-red-500">{error.message?.toString()}</p>}</>
  );
};

export default ErrorText;
