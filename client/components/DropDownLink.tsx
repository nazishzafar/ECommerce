import Link from "next/link";
import React from "react";

const DropDownLink = (props: any) => {
  let { href, children, ...rest } = props;

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};

export default DropDownLink;
