"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createAction } from "@/app/actions";
import { SyntheticEvent, useState } from "react";
import Form from "next/form";
import SubmitButton from "@/components/SubmitButton";
import Container from "@/components/Container";

export default function Home() {
  const [submitState, setSubmitState] = useState("ready");

  const handleOnSubmit = async (event: SyntheticEvent) => {
    if (submitState === "pending") {
      event.preventDefault();
      return;
    }
    setSubmitState("pending");
  };

  return (
    <main className="h-screen">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Create a new Invoice</h1>
        </div>

        <Form
          action={createAction}
          onSubmit={handleOnSubmit}
          className="grid gap-4 max-w-xs"
        >
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">
              Billing Name
            </Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">
              Billing Email
            </Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div>
            <Label htmlFor="value" className="block mb-2 font-semibold text-sm">
              Value
            </Label>
            <Input id="value" name="value" type="text" />
          </div>
          <div>
            <Label
              htmlFor="description"
              className="block mb-2 font-semibold text-sm"
            >
              Description
            </Label>
            <Textarea id="description" name="description"></Textarea>
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
