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
import { useNavigate, useLocation } from "react-router-dom";
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
  const isLaptop = useMediaQuery('(min-width:900px)');
  const navigate = useNavigate();
  const location = useLocation();

  // Back icon handler: go back in history
  const handleBack = () => navigate(-1);

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
              setFormData={data => { setFormData(data); navigate('/list'); }}
              values={formFields}
              onFieldChange={handleFieldChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <TrendingList formData={formData} />
          </Box>
        </Box>
      ) : (
        location.pathname === '/list' && formData ? (
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
              setFormData={data => { setFormData(data); navigate('/list'); }}
              values={formFields}
              onFieldChange={handleFieldChange}
            />
          </Box>
        )
      )}
    </Box>
  );
}
