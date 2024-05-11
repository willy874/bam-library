import { Button } from "@bam/button";
import { css } from "../../styled-system/css";
import ClientButton from "@/components/ClientButton";
import { token } from "../../styled-system/tokens";
import { center } from "../../styled-system/patterns";

export default async function Home() {
  return (
    <div className={center({ h: 'full' })}>
      <div className={css({
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 'semibold',
        color: 'yellow.300',
        textAlign: 'center',
        textStyle: '4xl',
      })}>
        <Button
          className={css({
            bg: "red",
            cursor: 'pointer',
          })}
          style={{
            color: token("colors.muted"),
          }}
        >
          {"Server side Button interact with theme"}
        </Button>
        <ClientButton />
        <div
          className={css({
            fontSize: "3xl",
            fontWeight: "bold",
            color: "text",
          })}
        >
          Hello 🐼!
        </div>
      </div>
    </div>
  );
}
