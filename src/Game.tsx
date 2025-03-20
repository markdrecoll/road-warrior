import { Scene } from "./components/Scene";
import { Player } from "./components/Player";
import { Map } from "./components/Map";

export const Game = () => {
	return (
		<Scene>
			<Player />
			<Map />
		</Scene>
	)
}