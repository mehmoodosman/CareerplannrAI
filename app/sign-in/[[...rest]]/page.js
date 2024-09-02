import { Box } from '@mui/material';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <SignIn routing="hash" />
        </Box>
    );
}

