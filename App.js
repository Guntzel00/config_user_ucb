import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Switch,
	Button,
	SafeAreaView,
	Appearance,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function App() {
	// Estados das preferências do usuário
	const [tema, setTema] = useState('Claro');
	const [tamanhoFonte, setTamanhoFonte] = useState(16);
	const [modoNoturno, setModoNoturno] = useState(false);

	// Detectar mudanças nas preferências de tema do sistema
	useEffect(() => {
		if (tema === 'Automático') {
			const preferenciaSistema = Appearance.getColorScheme(); // Obtém a preferência do sistema (light ou dark)
			if (preferenciaSistema === 'dark') {
				setModoNoturno(true);
			} else {
				setModoNoturno(false);
			}
		}
	}, [tema]);

	// Função para atualizar o tema e modificar o modo noturno conforme o tema escolhido
	const atualizarTema = (novoTema) => {
		setTema(novoTema);
		if (novoTema === 'Claro') {
			setModoNoturno(false);
		} else if (novoTema === 'Escuro') {
			setModoNoturno(true);
		} else if (novoTema === 'Automático') {
			const preferenciaSistema = Appearance.getColorScheme();
			setModoNoturno(preferenciaSistema === 'dark');
		}
	};

	// Função para resetar as preferências para os valores iniciais
	const resetarPreferencias = () => {
		setTema('Claro');
		setTamanhoFonte(16);
		setModoNoturno(false);
	};

	// Definir cor de texto de acordo com o tema selecionado
	const definirCorTexto = () => {
		if (tema === 'Claro' || (tema === 'Automático' && !modoNoturno)) {
			return '#000000'; // Cor preta para tema claro
		} else if (tema === 'Escuro' || (tema === 'Automático' && modoNoturno)) {
			return '#ffffff'; // Cor branca para tema escuro
		}
	};

	// Definir cor de fundo com base no modo noturno
	const corDeFundo = modoNoturno ? '#333333' : '#ffffff'; // Fundo escuro para modo noturno ativado
	const corTexto = definirCorTexto();

	return (
		<SafeAreaView style={[estilos.container, { backgroundColor: corDeFundo }]}>
			{/* Título */}
			<Text
				style={[estilos.titulo, { color: corTexto, fontSize: tamanhoFonte }]}
			>
				Configurações de Preferências
			</Text>

			{/* Picker para selecionar o tema */}
			<Text
				style={[estilos.rotulo, { color: corTexto, fontSize: tamanhoFonte }]}
			>
				Tema Preferido:
			</Text>
			<View
				style={[
					estilos.pickerContainer,
					{ backgroundColor: modoNoturno ? '#444444' : '#ffffff' },
				]}
			>
				<Picker
					selectedValue={tema}
					style={estilos.seletor}
					dropdownIconColor='#000'
					onValueChange={(valor) => atualizarTema(valor)}
				>
					<Picker.Item label='Claro' value='Claro' />
					<Picker.Item label='Escuro' value='Escuro' />
					<Picker.Item label='Automático' value='Automático' />
				</Picker>
			</View>

			{/* Slider para ajuste do tamanho da fonte */}
			<Text
				style={[estilos.rotulo, { color: corTexto, fontSize: tamanhoFonte }]}
			>
				Tamanho da Fonte: {tamanhoFonte}
			</Text>
			<Slider
				style={estilos.deslizante}
				minimumValue={12}
				maximumValue={30}
				step={1}
				value={tamanhoFonte}
				onValueChange={(valor) => setTamanhoFonte(valor)}
				minimumTrackTintColor={corTexto}
				thumbTintColor={corTexto}
			/>

			{/* Switch para ativar/desativar o modo noturno */}
			<View style={estilos.containerSwitch}>
				<Text
					style={[estilos.rotulo, { color: corTexto, fontSize: tamanhoFonte }]}
				>
					Modo Noturno:
				</Text>
				<Switch
					value={modoNoturno}
					onValueChange={(valor) => {
						setModoNoturno(valor);
						// Ajusta o tema automaticamente ao ativar/desativar o modo noturno
						if (valor) {
							setTema('Escuro');
						} else {
							setTema('Claro');
						}
					}}
					trackColor={{ false: '#767577', true: '#81b0ff' }}
					thumbColor={modoNoturno ? '#81b0ff' : '#f4f3f4'}
				/>
				<Text
					style={[
						estilos.estadoSwitch,
						{ color: corTexto, fontSize: tamanhoFonte },
					]}
				>
					{modoNoturno ? 'Ativado' : 'Desativado'}
				</Text>
			</View>

			{/* Botão para resetar as preferências */}
			<Button
				title='Resetar Preferências'
				onPress={resetarPreferencias}
				color='#007BFF'
			/>

			{/* Mostrar as preferências selecionadas */}
			<View style={estilos.containerPreferencias}>
				<Text
					style={[
						estilos.textoPreferencia,
						{ color: corTexto, fontSize: tamanhoFonte },
					]}
				>
					Tema Selecionado: {tema}
				</Text>
				<Text
					style={[
						estilos.textoPreferencia,
						{ color: corTexto, fontSize: tamanhoFonte },
					]}
				>
					Tamanho da Fonte: {tamanhoFonte}
				</Text>
				<Text
					style={[
						estilos.textoPreferencia,
						{ color: corTexto, fontSize: tamanhoFonte },
					]}
				>
					Modo Noturno: {modoNoturno ? 'Ativado' : 'Desativado'}
				</Text>
			</View>
		</SafeAreaView>
	);
}

// Estilização da interface usando StyleSheet
const estilos = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	titulo: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20,
	},
	rotulo: {
		fontSize: 18,
		marginVertical: 10,
	},
	pickerContainer: {
		width: 200,
		height: 50,
		borderRadius: 5,
		justifyContent: 'center',
		marginBottom: 20,
		borderColor: '#ddd',
		borderWidth: 1,
	},
	seletor: {
		height: 50,
		width: 200,
		color: '#000',
	},
	deslizante: {
		width: 300,
		height: 40,
		marginBottom: 20,
	},
	containerSwitch: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 20,
	},
	estadoSwitch: {
		fontSize: 18,
		marginLeft: 10,
	},
	containerPreferencias: {
		marginTop: 30,
		alignItems: 'center',
	},
	textoPreferencia: {
		fontSize: 16,
		textAlign: 'center',
		marginVertical: 5,
	},
});
