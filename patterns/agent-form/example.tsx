import { AgentForm } from "./component"
import { z } from "zod"

// Example 1: Basic Contact Form
export function BasicContactFormExample() {
  return (
    <AgentForm
      title="Contact Us"
      description="Fill out the form below and we'll get back to you"
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
          required: true,
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          placeholder: "How can we help?",
          required: true,
        },
      ]}
      onSubmit={(data) => {
        console.log("Form submitted:", data)
        alert(`Thank you, ${data.name}! We'll be in touch.`)
      }}
    />
  )
}

// Example 2: Form with Zod Schema Validation
export function ValidatedFormExample() {
  // Define validation schema
  const formSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters"),
    email: z
      .string()
      .email("Please enter a valid email address"),
    age: z
      .number()
      .min(18, "You must be at least 18 years old")
      .max(120, "Please enter a valid age"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    terms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms and conditions"),
  })

  return (
    <AgentForm
      title="Create Account"
      description="Sign up for a new account"
      fields={[
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
          description: "Choose a unique username (3-20 characters)",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
          required: true,
        },
        {
          name: "age",
          label: "Age",
          type: "number",
          placeholder: "18",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
          description: "At least 8 characters, 1 uppercase, 1 number",
        },
        {
          name: "terms",
          label: "Terms & Conditions",
          type: "checkbox",
          placeholder: "I accept the terms and conditions",
          required: true,
        },
      ]}
      schema={formSchema}
      onSubmit={async (data) => {
        console.log("Valid form data:", data)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert("Account created successfully!")
      }}
      submitLabel="Create Account"
    />
  )
}

// Example 3: Form with Select and Radio
export function SelectRadioFormExample() {
  return (
    <AgentForm
      title="Survey"
      description="Help us understand your preferences"
      fields={[
        {
          name: "country",
          label: "Country",
          type: "select",
          required: true,
          options: [
            { label: "United States", value: "us" },
            { label: "Canada", value: "ca" },
            { label: "United Kingdom", value: "uk" },
            { label: "Australia", value: "au" },
          ],
        },
        {
          name: "experience",
          label: "How would you rate your experience?",
          type: "radio",
          required: true,
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" },
          ],
        },
        {
          name: "comments",
          label: "Additional Comments",
          type: "textarea",
          placeholder: "Optional feedback...",
        },
      ]}
      onSubmit={(data) => {
        console.log("Survey submitted:", data)
        alert("Thank you for your feedback!")
      }}
      submitLabel="Submit Survey"
    />
  )
}

// Example 4: Form with Toggle and Date
export function AdvancedFieldsFormExample() {
  return (
    <AgentForm
      title="Event Registration"
      description="Register for our upcoming event"
      fields={[
        {
          name: "name",
          label: "Full Name",
          type: "text",
          required: true,
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
        },
        {
          name: "date",
          label: "Preferred Date",
          type: "date",
          required: true,
        },
        {
          name: "newsletter",
          label: "Subscribe to Newsletter",
          type: "toggle",
          defaultValue: false,
        },
        {
          name: "dietary",
          label: "Dietary Restrictions",
          type: "select",
          options: [
            { label: "None", value: "none" },
            { label: "Vegetarian", value: "vegetarian" },
            { label: "Vegan", value: "vegan" },
            { label: "Gluten-Free", value: "gluten-free" },
          ],
        },
      ]}
      onSubmit={(data) => {
        console.log("Registration:", data)
        alert("You're registered!")
      }}
      submitLabel="Register"
    />
  )
}

// Example 5: File Upload Form
export function FileUploadFormExample() {
  return (
    <AgentForm
      title="Upload Document"
      description="Submit your documents for review"
      fields={[
        {
          name: "name",
          label: "Your Name",
          type: "text",
          required: true,
        },
        {
          name: "document",
          label: "Document",
          type: "file",
          required: true,
          description: "PDF, DOC, or DOCX (max 10MB)",
        },
        {
          name: "category",
          label: "Document Category",
          type: "select",
          required: true,
          options: [
            { label: "Resume", value: "resume" },
            { label: "Cover Letter", value: "cover" },
            { label: "Transcript", value: "transcript" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "notes",
          label: "Additional Notes",
          type: "textarea",
          placeholder: "Any additional information...",
        },
      ]}
      onSubmit={(data) => {
        console.log("File upload:", data)
        alert("Document uploaded successfully!")
      }}
      submitLabel="Upload"
    />
  )
}

// Example 6: Form with Field-Level Validation
export function FieldLevelValidationExample() {
  return (
    <AgentForm
      title="Sign Up"
      fields={[
        {
          name: "username",
          label: "Username",
          type: "text",
          required: true,
          validation: z.string().min(3).max(20),
          description: "3-20 characters",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          validation: z.string().email(),
        },
        {
          name: "website",
          label: "Website",
          type: "text",
          validation: z.string().url().optional(),
          placeholder: "https://example.com",
          description: "Optional: Enter your website URL",
        },
      ]}
      onSubmit={(data) => {
        console.log("Sign up:", data)
        alert("Account created!")
      }}
    />
  )
}

export default BasicContactFormExample
