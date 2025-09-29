
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function TrendingList({ formData }) {
  if (!formData || !formData.game) return null;

  // Determine separator based on listType
  let separator = "\n";
  if (formData.listType === "userdefined") {
    separator = formData.separator || "\n";
  } else if (formData.listType === "predefined") {
    separator = formData.separator || "\n";
  }

  const items = formData.game
    .split(separator)
    .map(item => item.trim())
    .filter(Boolean);

  const getItemContent = (item) => {
    return `${item} ${formData.additionalText}\n\n${formData.keyword}\n${formData.hashtag}`;
  };

  const handleCopy = (content) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {items.map((item, idx) => {
        const content = getItemContent(item);
        return (
          <Paper key={idx} sx={{ p: 2, mb: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1">
                  {item} {formData.additionalText}
                </Typography>
                <br></br>
                <Typography variant="body2" color="text.secondary">
                  {formData.keyword}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formData.hashtag}
                </Typography>
              </Box>
              <IconButton aria-label="copy" onClick={() => handleCopy(content)}>
                <ContentCopyIcon />
              </IconButton>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
