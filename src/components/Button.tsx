import React, { FC } from 'react';

type Props = {
  classNameButton: string,
  text: string,
};

export const Button: FC<Props> = ({
  classNameButton,
  text,
}) => {
  return (
    <button
      type="submit"
      className={classNameButton}
    >
      {text}
    </button>
  );
};