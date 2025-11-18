import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type CustomCardProps = {
  title: string;
  description: string;
  action: React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
};

export const CCustomCard = ({
  title,
  description,
  action,
  content,
  footer,
}: CustomCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>{action}</CardAction>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};
