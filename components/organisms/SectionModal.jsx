import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SectionBadge from "components/atomic/SectionBadge";
import SectionTitle from "components/atomic/SectionTitle";
import ContactLinkItem from "components/molecules/ContactLinkItem";

function BulletList({ items }) {
  return (
    <Stack component="ul" spacing={1} sx={{ pl: 2, m: 0 }}>
      {items.map((item) => (
        <Typography component="li" key={item} sx={{ color: "#1e293b" }}>
          {item}
        </Typography>
      ))}
    </Stack>
  );
}

export default function SectionModal({ open, onClose, section }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ pr: 6 }}>
        <SectionTitle>{section?.title}</SectionTitle>
        <Typography variant="body2" sx={{ color: "#475569", mt: 0.5 }}>
          {section?.subtitle}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 14, top: 14 }}
          aria-label="Fechar modal"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Stack spacing={2.2}>
          {section?.paragraphs?.map((text) => (
            <Typography key={text} sx={{ color: "#1e293b", lineHeight: 1.6 }}>
              {text}
            </Typography>
          ))}

          {section?.bullets?.length ? <BulletList items={section.bullets} /> : null}

          {section?.badges?.length ? (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {section.badges.map((badge) => (
                <SectionBadge key={badge} label={badge} />
              ))}
            </Stack>
          ) : null}

          {section?.groups?.map((group) => (
            <Box key={group.title}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a", mb: 1 }}>
                {group.title}
              </Typography>
              {group.paragraphs?.map((text) => (
                <Typography key={text} sx={{ color: "#334155", mb: 1.2, lineHeight: 1.6 }}>
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

          {section?.contacts?.length ? (
            <Stack spacing={1.2}>
              {section.contacts.map((item) => (
                <ContactLinkItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  description={item.description}
                />
              ))}
            </Stack>
          ) : null}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
