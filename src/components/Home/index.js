import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import TrendingForm from "../TrendingForm";
import TrendingList from "../TrendingList";
import { useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Home({ mode, onToggleMode }) {
  const [formFields, setFormFields] = useState({
    keyword: '',
    hashtag: '',
    separator: '\n',
    listType: 'userdefined',
    additionalText: '',
    game: ''
  });
  const [formData, setFormData] = useState(null);
  const [showList, setShowList] = useState(false);
  const isLaptop = useMediaQuery('(min-width:900px)');

  // Back icon handler: just show the form again, don't clear formData or formFields
  const handleBack = () => setShowList(false);

  // Handler to update individual fields
  const handleFieldChange = (field, value) => {
    setFormFields(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Trending Is Fun
          </Typography>
          <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
            <IconButton color="inherit" onClick={onToggleMode}>
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {isLaptop ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 4, p: 2 }}>
          <Box sx={{ flex: 1 }}>
            <TrendingForm
              setFormData={data => { setFormData(data); setShowList(true); }}
              values={formFields}
              onFieldChange={handleFieldChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TrendingList formData={formData} />
          </Box>
        </Box>
      ) : (
        showList && formData ? (
          <Box sx={{ p: 2 }}>
            <Tooltip title="Back to form">
              <IconButton onClick={handleBack} sx={{ mb: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <TrendingList formData={formData} />
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <TrendingForm
              setFormData={data => { setFormData(data); setShowList(true); }}
              values={formFields}
              onFieldChange={handleFieldChange}
            />
          </Box>
        )
      )}
    </Box>
  );
}
