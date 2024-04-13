export function Logo({
    size = 40,
}: {
    size?: number;
}) {

    return (
        <div style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 79" style={{height: '100%', width: 'auto'}}>
                <path fill="#00a6cc" d="M11 0h10c24 0 37 14 37 39 0 26-14 40-37 40H11z" />
                <path fill="#007db3" d="m0 56 11-10v33H0z" />
            </svg>
        </div>
    );
}