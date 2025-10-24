

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import Tooltip from '@mui/material/Tooltip';

export default function TrendingForm({ setFormData, values, onFieldChange }) {
  // Button enable/disable logic
  const allFieldsEmpty = !values.keyword && !values.hashtag && !values.additionalText && !values.game;
  const isGameNotEmpty = !!values.game;
  
  const predefinedKeys = [
    'predefined_blpair',
    'predefined_country',
    'predefined_food',
    'predefined_weekday',
    'predefined_month',
  ];
  const isPredefinedSelected = values.listType === 'predefined';
  const isAnyPredefinedChecked = predefinedKeys.some(key => !!values[key]);
  const isAnyFieldNotEmpty = !!(values.keyword || values.hashtag || values.additionalText || values.game || isPredefinedSelected);
  const canGenerate = isPredefinedSelected
    ? isAnyPredefinedChecked
    : !!(values.keyword && values.hashtag && values.game);

  const onGenerate = () => {
    if (setFormData) {
      const options = [
        'predefined_blpair',
        'predefined_country',
        'predefined_food',
        'predefined_weekday',
        'predefined_month',
      ];
      const predefinedSelections = {};
      options.forEach(opt => {
        predefinedSelections[opt] = !!values[opt];
      });
      setFormData({
        ...values,
        ...predefinedSelections,
        isPredefinedSelected: values.listType === 'predefined'
      });
    }
  };

  return (
    <Box>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <TextField
            label="Keyword"
            variant="outlined"
            fullWidth
            value={values.keyword}
            onChange={e => onFieldChange('keyword', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Paste">
                    <IconButton
                      aria-label="paste keyword"
                      onClick={async () => {
                        if (navigator.clipboard) {
                          const text = await navigator.clipboard.readText();
                          onFieldChange('keyword', text);
                        }
                      }}
                      edge="end"
                    >
                      <ContentPasteIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Hashtag"
            variant="outlined"
            fullWidth
            value={values.hashtag}
            onChange={e => onFieldChange('hashtag', e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Paste">
                    <IconButton
                      aria-label="paste hashtag"
                      onClick={async () => {
                        if (navigator.clipboard) {
                          const text = await navigator.clipboard.readText();
                          onFieldChange('hashtag', text);
                        }
                      }}
                      edge="end"
                    >
                      <ContentPasteIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        
        <Grid item>
          <TextField
            label="Additional text"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={values.additionalText}
            onChange={e => onFieldChange('additionalText', e.target.value)}
          />
        </Grid>
        <Grid item>
          <RadioGroup
            row
            value={values.listType}
            onChange={e => onFieldChange('listType', e.target.value)}
            name="list-type"
          >
            <FormControlLabel value="userdefined" control={<Radio />} label="User defined" />
            <FormControlLabel value="predefined" control={<Radio />} label="Pre defined" />
          </RadioGroup>
        </Grid>
        {values.listType !== 'predefined' && (
          <Grid item>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="separator-label">Separator</InputLabel>
              <Select
                labelId="separator-label"
                value={values.separator}
                label="Separator"
                onChange={e => onFieldChange('separator', e.target.value)}
              >
                <MenuItem value=",">Comma</MenuItem>
                <MenuItem value="|">Pipe</MenuItem>
                <MenuItem value={"\n"}>New Line</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}
        {values.listType === 'userdefined' && (
          <Grid item>
            <TextField
              label="Game"
              variant="outlined"
              fullWidth
              multiline
              minRows={10}
              maxRows={10}
              value={values.game}
              onChange={e => onFieldChange('game', e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                    <Box sx={{ alignSelf: 'flex-end' }}>
                      <Tooltip title="Paste">
                        <IconButton
                          aria-label="paste game"
                          onClick={async () => {
                            if (navigator.clipboard) {
                              const text = await navigator.clipboard.readText();
                              onFieldChange('game', text);
                            }
                          }}
                          size="small"
                          edge="end"
                          sx={{ mt: 0.5 }}
                        >
                          <ContentPasteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                )
              }}
            />
          </Grid>
        )}
        {values.listType === 'predefined' && (
          <Grid item container sx={{pl: 1}}>
            <FormControl component="fieldset">
              {(() => {
                const options = [
                  { key: 'predefined_blpair', label: 'BL Pair' },
                  { key: 'predefined_country', label: 'Country' },
                  { key: 'predefined_food', label: 'Food' },
                  { key: 'predefined_weekday', label: 'Week Day' },
                  { key: 'predefined_month', label: 'Month of Year' },
                ];
                return (
                  <Grid container spacing={2}>
                    {
                      options.map((opt, colIdx) => (
                        <Grid item size={6} key={opt.key}>
                          <FormControlLabel
                            control={
                              <input
                                type="checkbox"
                                checked={!!values[opt.key]}
                                onChange={e => onFieldChange(opt.key, e.target.checked)}
                              />
                            }
                            label={opt.label}
                          />
                        </Grid>
                      )
                    )}
                  </Grid>
                );
              })()}
            </FormControl>
          </Grid>
  )}
        <Grid item container justifyContent="end" wrap="nowrap" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            disabled={allFieldsEmpty || !canGenerate}
            onClick={onGenerate}
            sx={{ ml: 1 }}
          >
            Generate
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={allFieldsEmpty || !isGameNotEmpty}
            sx={{ ml: 1 }}
            onClick={() => onFieldChange('game', '')}
          >
            Reset List
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={allFieldsEmpty || !isAnyFieldNotEmpty}
            sx={{ ml: 1 }}
            onClick={() => {
              onFieldChange('keyword', '');
              onFieldChange('hashtag', '');
              onFieldChange('separator', '\n');
              onFieldChange('listType', 'userdefined');
              onFieldChange('additionalText', '');
              onFieldChange('game', '');
              onFieldChange('predefined_blpair', false);
              onFieldChange('predefined_country', false);
              onFieldChange('predefined_food', false);
              onFieldChange('predefined_weekday', false);
              onFieldChange('predefined_month', false);
            }}
          >
            Reset All
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
