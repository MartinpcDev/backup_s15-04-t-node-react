import server from './server';
import { PORT } from './utils/constants';

server.listen(PORT, () => {
	console.log(`API corriendo Correctamente en http://localhost:${PORT}/api/v1`);
});
