import { Box, Divider, Stack, Typography } from "@mui/material";
import SectionBadge from "components/atomic/SectionBadge";
import SectionTitle from "components/atomic/SectionTitle";
import ContactLinkItem from "components/molecules/ContactLinkItem";

function BulletList({ items }) {
  return (
    <Stack component="ul" spacing={0.8} sx={{ m: 0, pl: 2.5 }}>
      {items.map((item) => (
        <Typography key={item} component="li" sx={{ color: "#1e293b", lineHeight: 1.65 }}>
          {item}
        </Typography>
      ))}
    </Stack>
  );
}

export default function LandingSection({ section }) {
  return (
    <Box
      id={section.id}
      sx={{
        bgcolor: "#ffffff",
        border: "1px solid #dbeafe",
        borderRadius: 4,
        p: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={2}>
        <SectionTitle component="h2">
          {section.emoji ? `${section.emoji} ` : ""}
          {section.title}
        </SectionTitle>

        {section.paragraphs?.map((text) => (
          <Typography key={text} sx={{ color: "#334155", lineHeight: 1.7 }}>
            {text}
          </Typography>
        ))}

        {section.bullets?.length ? <BulletList items={section.bullets} /> : null}

        {section.badges?.length ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {section.badges.map((badge) => (
              <SectionBadge key={badge} label={badge} />
            ))}
          </Stack>
        ) : null}

        {section.groups?.map((group) => (
          <Box key={group.title}>
            <Divider sx={{ mb: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
              {group.title}
            </Typography>
            {group.paragraphs?.map((text) => (
              <Typography key={text} sx={{ color: "#334155", mb: 1.1, lineHeight: 1.7 }}>
                {text}
              </Typography>
            ))}
            {group.bullets?.length ? <BulletList items={group.bullets} /> : null}
            {group.badges?.length ? (
              <Stack direction="row" flexWrap="wrap" gap={1} mt={1.2}>
                {group.badges.map((badge) => (
                  <SectionBadge key={badge} label={badge} />
                ))}
              </Stack>
            ) : null}
          </Box>
        ))}

        {section.contacts?.length ? (
          <Stack spacing={1.2}>
            {section.contacts.map((contact) => (
              <ContactLinkItem
                key={contact.label}
                label={contact.label}
                href={contact.href}
                description={contact.description}
              />
            ))}
          </Stack>
        ) : null}
      </Stack>
    </Box>
  );
}
