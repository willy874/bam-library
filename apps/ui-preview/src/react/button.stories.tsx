import { Button } from "bam-ui";
import type { Meta, StoryFn } from "@storybook/react";
import React, { ButtonHTMLAttributes } from "react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    children: { control: "text" },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryFn<ButtonHTMLAttributes<HTMLButtonElement>>;

const StoryTemplate: Story = (args) => <Button {...args} />;

export const Primary: Story = StoryTemplate.bind({});
Primary.args = {
  children: "Primary",
  disabled: false,
};
