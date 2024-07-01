export const fetchData = async (url, method, data) => {
    const token = localStorage.getItem('token');
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, options);

        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem('token');
            window.location.href = '/iniciar-sesion';
            return;
        }

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Error al realizar la solicitud');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
};
