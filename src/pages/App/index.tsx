import { SetupProviders } from "./setup/SetupProviders";
import Therapists from "../Therapists";

export default function App() {
	return (
		<SetupProviders>
			<Therapists />
		</SetupProviders>
	);
}
