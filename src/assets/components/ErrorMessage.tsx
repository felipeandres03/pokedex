type Props = {
  error: string;
};

function ErrorMessage({ error }: Props) {
  return <div>{error}</div>;
}

export default ErrorMessage;
