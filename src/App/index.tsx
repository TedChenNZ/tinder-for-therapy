import { SetupProviders } from "./setup/SetupProviders";
import Therapists from "./therapists";

function App() {
	return (
		<SetupProviders>
			<Therapists />
		</SetupProviders>
	);
}

export default App;
