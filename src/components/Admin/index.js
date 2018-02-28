import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import firebase from 'firebase';
import Switch from 'react-toggle-switch';
import "react-toggle-switch/dist/css/switch.min.css"



class Admin extends Component {
	constructor() {
		super();
		this.state = {
			iniciatives: [],
			cantInfr: 0,
			moneyInfr: 0,
			cantClim: 0,
			moneyClim: 0,
			cantSoli: 0,
			moneySoli: 0,
			switchedPropose: false,
			switchedEvaluate: false,
			switchedInvest: false,
			switchedExecute: false,
		};

		this.toggleSwitchEvaluate = this.toggleSwitchEvaluate.bind(this);
		this.toggleSwitchInvest = this.toggleSwitchInvest.bind(this);
		this.toggleSwitchExecute = this.toggleSwitchExecute.bind(this);
		this.toggleSwitchPropose = this.toggleSwitchPropose.bind(this);

	}

	toggleSwitchPropose() {
		const dbRefPropose = firebase.database().ref('stages/');
		if (this.state.switchedPropose === false) {
			dbRefPropose.update({
				"4/state": !this.state.switchedPropose,
				"3/state": false,
				"2/state": false,
				"1/state": false
			});
		} else {
			dbRefPropose.update({
				"4/state": !this.state.switchedPropose,
			});
		}

	};

	toggleSwitchEvaluate() {
		const dbRefEvaluate = firebase.database().ref('stages/');
		if (this.state.switchedEvaluate === false) {
			dbRefEvaluate.update({
				"4/state": false,
				"3/state": false,
				"2/state": false,
				"1/state": !this.state.switchedEvaluate
			});
		} else {
			dbRefEvaluate.update({
				"1/state": !this.state.switchedEvaluate
			});
		}
	};

	toggleSwitchInvest() {
		const dbRefInvest = firebase.database().ref('stages/');
		if (this.state.switchedInvest === false) {
			dbRefInvest.update({
				"4/state": false,
				"3/state": !this.state.switchedInvest,
				"2/state": false,
				"1/state": false
			});
		} else {
			dbRefInvest.update({
				"3/state": !this.state.switchedInvest,
			});
		}

	};

	toggleSwitchExecute() {
		const dbRefExecute = firebase.database().ref('stages/');
		if (this.state.switchedExecute === false) {
			dbRefExecute.update({
				"4/state": false,
				"3/state": false,
				"2/state": !this.state.switchedExecute,
				"1/state": false
			});
		} else {
			dbRefExecute.update({
				"2/state": !this.state.switchedExecute,

			});
		}

	};


	dataBar() {
		const data = {
			labels: ['Infrastructure', 'Climate and Culture', 'Solidarity fund'],
			datasets: [
				{
					label: '$$',

					backgroundColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56'
					],
					borderColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56'
					],
					borderWidth: 1,
					hoverBackgroundColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56'
					],
					hoverBorderColor: [
						'#FF6384',
						'#36A2EB',
						'#FFCE56'
					],
					data: [this.state.moneyInfr, this.state.moneyClim, this.state.moneySoli]
				}
			]
		};

		return data
	}

	dataDoughnut() {
		const data = {
			labels: [
				'Infrastructure',
				'Climate and Culture',
				'Solidarity fund'
			],
			datasets: [{
				data: [this.state.cantInfr, this.state.cantClim, this.state.cantSoli],
				backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				],
				hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
				]
			}],
			text: '40%',
			title: 'Titulo'
		};

		return data
	}

	componentWillMount() {
		const iRef = firebase.database().ref('iniciatives');
		iRef.on('value', (snapshot) => {
			let iniciatives = snapshot.val();

			for (let iniciative in iniciatives) {
				if (iniciatives[iniciative].categories === "Infrastructure") {
					this.setState((state, props) => {
						return {
							cantInfr: state.cantInfr + 1,
							moneyInfr: (state.moneyInfr + iniciatives[iniciative].moneyProgress)
						}
					});
				} else {
					if (iniciatives[iniciative].categories === "Climate and Culture") {
						this.setState((state, props) => {
							return {
							cantClim: state.cantClim + 1,
							moneyClim: (state.moneyClim + iniciatives[iniciative].moneyProgress)
						}
						});
					} else {
						this.setState((state, props) => {
							return {
							cantSoli: state.cantSoli + 1,
							moneySoli: (state.moneySoli + iniciatives[iniciative].moneyProgress)
						}
						});
					}
				}

			}

		});

		const stageRef = firebase.database().ref('stages');
		stageRef.on('value', (snapshot) => {
			let stages = snapshot.val();
			for (let stage in stages) {
				if (stages[stage].name === 'Evaluate') {
					this.setState({
						switchedEvaluate: stages[stage].state
					});
				} else {
					if (stages[stage].name === 'Propose') {
						this.setState({
							switchedPropose: stages[stage].state
						});
					} else {
						if (stages[stage].name === 'Invest') {
							this.setState({
								switchedInvest: stages[stage].state
							});
						} else {
							if (stages[stage].name === 'Execute') {
								this.setState({
									switchedExecute: stages[stage].state
								});

							}
						}
					}
				}
			}
		});

	}

	render() {
		return (
			<div>
				<div className="cuadrado">
					<div className="row">
						<div className=	"col s12 l3">
							<h2 style={{ textAlign: 'center' }}>Propose</h2>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Switch onClick={this.toggleSwitchPropose} on={this.state.switchedPropose} />
							</div>
						</div>
						<div className="col s12 l3">
							<h2 style={{ textAlign: 'center' }}>Evaluate</h2>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Switch onClick={this.toggleSwitchEvaluate} on={this.state.switchedEvaluate} />
							</div>
						</div>
						<div className="col s12 l3">
							<h2 style={{ textAlign: 'center' }}>Invest</h2>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Switch onClick={this.toggleSwitchInvest} on={this.state.switchedInvest} />
							</div>
						</div>
						<div className="col s12 l3">
							<h2 style={{ textAlign: 'center' }}>Execute</h2>
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<Switch onClick={this.toggleSwitchExecute} on={this.state.switchedExecute} />
							</div>
						</div>
					</div>
				</div>
				<div className="cuadrado">
					<h1 style={{ textAlign: 'center' }}>
						Initiatives by category
				</h1>
					<Doughnut data={this.dataDoughnut()} />
				</div>
				<div className="cuadrado">
					<h1 style={{ textAlign: 'center' }}>
						Money by category
				</h1>
					<Bar data={this.dataBar()} />
				</div>
			</div>
		);
	};

}
export default Admin;