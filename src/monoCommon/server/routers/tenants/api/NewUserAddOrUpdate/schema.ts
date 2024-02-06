const schema = {
  type: "object",
  $async: true,
  properties: {
    code: { type: "string", format: "asmensKodas", minLength: 2, maxLength: 11 },
    name: { type: "string", minLength: 2, maxLength: 50 },
    lastName: { type: "string", minLength: 2, maxLength: 50 },
    email: { type: "string", "format": "email" },
    phone: {
      type: "string", minLength: 2, maxLength: 50
    },
  },
  required: ["code", "name", "lastName", "email", "phone"]
} as const;


export default schema;