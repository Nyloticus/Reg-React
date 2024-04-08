import {styled} from "@mui/material/styles";
import {Autocomplete} from "@mui/material";

const CustomSelect = styled((props: any) => <Autocomplete {...props} />)(
    () => ({
        '& .MuiAutocomplete-input': {
            padding: ' 12px 14px !important',
        }
    })
);

export default CustomSelect;
