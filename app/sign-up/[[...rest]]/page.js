import { Box } from '@mui/material';
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <SignUp />
        </Box>
    );
}
