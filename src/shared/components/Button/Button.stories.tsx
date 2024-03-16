import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "./Button"; // Assuming Button.tsx is in the same directory

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

interface TemplateProps {
  children: React.ReactNode;
}

const Template: StoryFn<ButtonProps & TemplateProps> = (args) => (
  <Button {...args} />
);

export const Default: StoryFn<ButtonProps & TemplateProps> = Template.bind({});
Default.args = {
  children: "DefaultButton",
};
