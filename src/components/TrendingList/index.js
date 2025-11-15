
import Box from "@mui/material/Box";
import { blpair, country, food, weekday, month, animal, gmmtv_actor } from "./predefinedData";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useState } from "react";

export default function TrendingList({ formData }) {

  const [copiedIndex, setCopiedIndex] = useState([]);
  if (!formData) return null;

  // Determine separator based on listType
  let separator = "\n";
  separator = formData.separator || "\n";

  let items = [];
  // Check for multiple predefined selections
  const predefinedItems = [];
  if (formData.predefined_blpair) predefinedItems.push(...blpair);
  if (formData.predefined_country) predefinedItems.push(...country);
  if (formData.predefined_food) predefinedItems.push(...food);
  if (formData.predefined_weekday) predefinedItems.push(...weekday);
  if (formData.predefined_month) predefinedItems.push(...month);
  if (formData.predefined_gmmtv_actor) predefinedItems.push(...gmmtv_actor);
  if (formData.predefined_animal) predefinedItems.push(...animal);

  if (predefinedItems.length > 0) {
    items = predefinedItems;
  } else {
    if (!formData.game) return null;
    items = formData.game
      .split(separator)
      .map(item => item.trim())
      .filter(Boolean);
  }

  const getItemContent = (item) => {
    const hashtags = formData.hashtag
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean)
      .join('\n');
    return `${item} ${formData.additionalText}\n\n${formData.keyword}${hashtags ? '\n\n' + hashtags : ''}`;
  };

  const handleCopy = (content,idx) => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(content);
      setCopiedIndex(prev => [...prev, idx]);
    }
  };

  return (
    <Box>
      {items.map((item, idx) => {
        const content = getItemContent(item, idx);
        return (
          <Paper key={idx} sx={{ p: 2, mb: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body1">
                  {item} {formData.additionalText}
                </Typography>
                <br></br>
                <Typography variant="body2">
                  {formData.keyword}
                </Typography>
                <br></br>
                {formData.hashtag
                  .split(',')
                  .map((tag, i) => (
                    <Typography key={i} variant="body2">
                      {tag.trim()}
                    </Typography>
                  ))}
              </Box>
              <IconButton aria-label="copy" onClick={() => handleCopy(content, idx)}>
                {copiedIndex.includes(idx) ? <CheckRoundedIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
}
// ...existing code...
