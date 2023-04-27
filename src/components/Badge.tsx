import React from "react";
import "./Badge.css";
import cn from "classnames";


type Props = {
  text: string,
};

export const Badge: React.FC<Props> = React.memo(({
  text
}) => {

  return (
    <div className={cn('badge-wrapper', {
      west: text === 'West'
    })}>
      {text}
    </div>
  )
});