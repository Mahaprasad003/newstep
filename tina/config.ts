import { defineConfig } from "tinacms";

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // ──────────────────────────────────────────────
      // BLOG POSTS
      // ──────────────────────────────────────────────
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "mdx",
        ui: {
          router: ({ document }) => `/blog/${document._sys.filename}`,
          filename: {
            readonly: false,
            slugify: (values) => {
              return (values?.title || "")
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");
            },
          },
        },
        defaultItem: () => ({
          date: new Date().toISOString(),
          category: "General",
          published: true,
        }),
        fields: [
          {
            type: "string",
            name: "title",
            label: "Post Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish Date",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            required: true,
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Thumbnail Image",
          },
          {
            type: "string",
            name: "author",
            label: "Author Name",
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body Content",
            isBody: true,
          },
        ],
      },

      // ──────────────────────────────────────────────
      // GALLERY IMAGES (each file = one image)
      // ──────────────────────────────────────────────
      {
        name: "gallery",
        label: "Gallery Images",
        path: "content/gallery",
        format: "json",
        fields: [
          {
            type: "string",
            name: "alt",
            label: "Image Description",
            isTitle: true,
            required: true,
          },
          {
            type: "image",
            name: "src",
            label: "Image",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Events",
              "Workshops",
              "Achievements",
              "Campus",
            ],
          },
          {
            type: "string",
            name: "aspectRatio",
            label: "Aspect Ratio",
            options: [
              { label: "Portrait (3:4)", value: "portrait" },
              { label: "Landscape (4:3)", value: "landscape" },
              { label: "Square (1:1)", value: "square" },
            ],
          },
        ],
      },
      // ──────────────────────────────────────────────
      // TEAM MEMBERS (each file = one team member)
      // ──────────────────────────────────────────────
      {
        name: "team",
        label: "Team Members",
        path: "content/team",
        format: "json",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Full Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "title",
            label: "Role / Title",
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Team Category",
            required: true,
          },
          {
            type: "image",
            name: "headshot",
            label: "Headshot Image",
          },
          {
            type: "rich-text",
            name: "bio",
            label: "Profile Bio",
          },
          {
            type: "object",
            name: "socials",
            label: "Social Links",
            fields: [
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "twitter", label: "Twitter / X URL" },
              { type: "string", name: "facebook", label: "Facebook URL" },
              { type: "string", name: "instagram", label: "Instagram URL" },
            ],
          },
          {
            type: "number",
            name: "order",
            label: "Display Order",
            description: "Lower numbers appear first (e.g. 1 = Founder)",
          },
        ],
      },
      // ──────────────────────────────────────────────
      // SITE SETTINGS (Global config)
      // ──────────────────────────────────────────────
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          { type: "string", name: "tagline", label: "Hero Tagline" },
          { type: "string", name: "heroSubtext", label: "Hero Subtext", ui: { component: "textarea" } },
          { type: "string", name: "philosophyHeading", label: "Philosophy Section — Heading" },
          { type: "string", name: "philosophyBody", label: "Philosophy Section — Body Text (aim for 100–180 words)", ui: { component: "textarea" } },
          { type: "string", name: "phone", label: "Phone Number" },
          { type: "string", name: "email", label: "Email Address" },
          { type: "string", name: "whatsapp", label: "WhatsApp Number" },
          { type: "string", name: "address", label: "Physical Address" },
          {
            type: "object",
            name: "socials",
            label: "Social Media Links",
            fields: [
              { type: "string", name: "instagram", label: "Instagram URL" },
              { type: "string", name: "linkedin", label: "LinkedIn URL" },
              { type: "string", name: "twitter", label: "Twitter URL" },
              { type: "string", name: "facebook", label: "Facebook URL" },
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Hero Stats",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Stat Value (e.g. 100%)" },
              { type: "string", name: "label", label: "Stat Label (e.g. Success Rate)" },
            ]
          }
        ],
      },
      // ──────────────────────────────────────────────
      // TESTIMONIALS (Global config)
      // ──────────────────────────────────────────────
      {
        name: "testimonials",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "testimonials",
            label: "Testimonial Items",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name || "New Testimonial" }
              },
            },
            fields: [
              { type: "string", name: "name", label: "Author Name" },
              { type: "string", name: "role", label: "Author Role/Subtitle" },
              { type: "string", name: "quote", label: "Quote Text", ui: { component: "textarea" } },
              { type: "number", name: "rating", label: "Star Rating (1-5)" },
              { type: "image", name: "avatar", label: "Author Avatar" },
            ],
          },
        ],
      },
    ],
  },
});
