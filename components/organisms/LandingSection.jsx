import { Box, Divider, Grid, Link as MuiLink, Stack, Typography } from '@mui/material';
import SectionBadge from 'components/atomic/SectionBadge';
import GithubBreakoutShowcase from 'components/molecules/GithubBreakoutShowcase';

function BulletList({ items }) {
  return (
    <Stack component="ul" spacing={0.8} sx={{ m: 0, pl: 2.5 }}>
      {items.map((item) => (
        <Typography key={item} component="li" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
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
        p: { xs: 2.5, md: 3.5 },
        borderRadius: 5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Stack spacing={2}>
        {section.label ? <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: 13 }}>{section.label}</Typography> : null}
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {section.title}
        </Typography>

        {section.paragraphs?.map((text) => (
          <Typography key={text} sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
            {text}
          </Typography>
        ))}

        {section.showGithubBreakout ? <GithubBreakoutShowcase /> : null}

        {section.highlights?.length ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {section.highlights.map((item) => (
              <SectionBadge key={item} label={item} />
            ))}
          </Stack>
        ) : null}

        {section.bullets?.length ? <BulletList items={section.bullets} /> : null}

        {section.groups?.length ? (
          <Grid container spacing={2}>
            {section.groups.map((group) => (
              <Grid key={group.title} size={{ xs: 12, md: 6 }}>
                <Box sx={{ height: '100%', p: 2, borderRadius: 3, bgcolor: '#f8fbff', border: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {group.title}
                  </Typography>
                  {group.paragraphs?.map((text) => (
                    <Typography key={text} sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1 }}>
                      {text}
                    </Typography>
                  ))}
                  {group.bullets?.length ? <BulletList items={group.bullets} /> : null}
                  {group.badges?.length ? (
                    <Stack direction="row" flexWrap="wrap" gap={1} mt={1.4}>
                      {group.badges.map((badge) => (
                        <SectionBadge key={badge} label={badge} />
                      ))}
                    </Stack>
                  ) : null}
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : null}

        {section.contacts?.length ? (
          <>
            <Divider />
            <Grid container spacing={1.5}>
              {section.contacts.map((contact) => (
                <Grid key={contact.label} size={{ xs: 12, md: 6 }}>
                  <MuiLink
                    href={contact.href}
                    target={contact.href.startsWith('http') ? '_blank' : undefined}
                    rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    underline="none"
                    sx={{
                      display: 'block',
                      p: 1.75,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all .2s ease',
                      '&:hover': { borderColor: 'primary.light', transform: 'translateY(-2px)' },
                    }}
                  >
                    <Typography sx={{ fontWeight: 700 }}>{contact.label}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {contact.description}
                    </Typography>
                  </MuiLink>
                </Grid>
              ))}
            </Grid>
          </>
        ) : null}
      </Stack>
    </Box>
  );
}
