"use client";

import { Button } from "@bam/button";
import { css } from "../../styled-system/css";
import { getTheme, injectTheme } from "../../styled-system/themes";
import { useState } from "react";
import { setCookie } from "@/utilites/setCookie";

export default function ClientButton() {
  const [color, setColor] = useState("#aaa");
  const className = css({
    bg: color
  });

  return (
    <Button
      className={className}
      css={css}
      onClick={async () => {
        // Change the theme and the color of the button through className
        const current = document.documentElement.dataset.pandaTheme;
        const next = current === "primary" ? "secondary" : "primary";
        const theme = await getTheme(next);
        setCookie("theme", next, 7);
        injectTheme(document.documentElement, theme);
        setColor(color === '#aaa' ? 'red' : '#aaa');
      }}
    >
      {"Client Component Click me to change theme"}
    </Button>
  );
}

