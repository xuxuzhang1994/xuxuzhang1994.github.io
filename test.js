import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { SearchBar, WhiteSpace, WingBlank,ActivityIndicator } from 'antd-mobile';
import Swiper from 'swiper/dist/js/swiper.js'
import 'antd-mobile/dist/antd-mobile.css';
import 'swiper/dist/css/swiper.min.css'
import './test.less'
import { ListView } from 'antd-mobile';
import $ from 'jquery'

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
	input: {
		display: 'none',
	},
});

function MyBody(props) {
	return (
		<div className="am-list-body my-body">
			<span style={{ display: 'none' }}>you can custom body wrap element</span>
			{props.children}
		</div>
	);
}

const data = [
	{
		img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
		title: 'Meet hotel',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
		title: 'McDonald\'s invites you',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
	{
		img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
		title: 'Eat the week',
		des: '不是所有的兼职汪都需要风吹日晒',
	},
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
	const dataBlob = {};
	for (let i = 0; i < NUM_ROWS; i++) {
		const ii = (pIndex * NUM_ROWS) + i;
		dataBlob[`${ii}`] = `row - ${ii}`;
	}
	return dataBlob;
}

class App extends Component {
	constructor(props) {
		super(props);
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});

		this.state = {
			dataSource,
			isLoading: true,
		};
	}
	componentDidMount(){
		// you can scroll to the specified position
		// setTimeout(() => this.lv.scrollTo(0, 120), 800);

		// simulate initial Ajax
		setTimeout(() => {
			this.rData = genData();
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false,
			});
		}, 600);
		var mySwiper = new Swiper('.swiper-container', {
			slidesPerView : 1,
			spaceBetween : 20,
			// 如果需要分页器
			pagination: {
				el: '.swiper-pagination',
			}
		})
		var krpano;
		var linuuuk=".";
		var wectitle =  $('title').text();
		var timestamp = Date.parse(new Date());
		var panoxml={};
		var imgecomurl=$("#imgecomurl").val();var cor1comuru=$("#cor1comuru").val();var cor2comuru=$("#cor2comuru").val();var cor3comuru=$("#cor3comuru").val();var cor4comuru=$("#cor4comuru").val();var FilePath = "//vr.kuleiman.com/Public/panonn/";

		embedpano({
			swf: "//www.kuleiman.com/kuleiman.swf",
			xml: "//vr.kuleiman.com/Public/panonn/pano.xml?",
			target: "pano",
			html5: "prefer+webgl+preserveDrawingBuffer",
			wmode: "transparent",
			initvars: {
				design: '11',
				imgecomurl: imgecomurl,
				cor1comuru: cor1comuru,
				cor2comuru: cor2comuru,
				cor3comuru: cor3comuru,
				cor4comuru: cor4comuru,
				linuuuk: linuuuk,
				wectitle: wectitle,
				FilePath: FilePath,
				lhsk:1
			},
			webglsettings: {depth:true},
			passQueryParameters: true,
			vars: panoxml,
			onready: function() {
				krpano = document.getElementById("krpanoSWFObject");
				$('.box').remove();
				$('.top').remove();
			}
		});
	}
	// If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
	// componentWillReceiveProps(nextProps) {
	//   if (nextProps.dataSource !== this.props.dataSource) {
	//     this.setState({
	//       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
	//     });
	//   }
	// }

	onEndReached = (event) => {
		// load new data
		// hasMore: from backend data, indicates whether it is the last page, here is false
		if (this.state.isLoading && !this.state.hasMore) {
			return;
		}
		console.log('reach end', event);
		this.setState({ isLoading: true });
		setTimeout(() => {
			this.rData = { ...this.rData, ...genData(++pageIndex) };
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(this.rData),
				isLoading: false,
			});
		}, 1000);
	}

	render (){
		const separator = (sectionID, rowID) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED',
				}}
			/>
		);
		let index = data.length - 1;
		const row = (rowData, sectionID, rowID) => {
			if (index < 0) {
				index = data.length - 1;
			}
			const obj = data[index--];
			return (
				<div key={rowID} className='user-item'>
					<div className='base-info'>
						<img src="https://p1.meituan.net/msmerchant/cb0ce6b4298edeb3c1e95bc4ec1e5838108662.jpg@368w_208h_1e_1c" alt=""/>
						<div className='user-info'>
							<div className='top'>
								<div className='name'>牛肉面111</div>
								<div className='juli'>1.1km</div>
							</div>
							<div className='score'>4.3分</div>
						</div>
					</div>
					<div className='active-info'>
						<div className='name'> <span className='active-name'>吃牛肉面送牛肉</span> 等<span className='number'>5</span>个活动</div>
						<div className='active-number'>已有675人参加活动</div>
					</div>
				</div>
			);
		};
		const { classes } = this.props;
		return (
			<div className='shenghuo'>
				<div className='krpanoSWFObject'></div>
				<SearchBar placeholder="Search" maxLength={8} />
				<div className="swiper-container">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<img src="http://p0.meituan.net/codeman/daa73310c9e57454dc97f0146640fd9f69772.jpg" alt=""/>
						</div>
						<div className="swiper-slide">
							<img src="http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg" alt=""/>
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>
				<div className='classify'>
					<div className='item'>
						<Button variant="contained" className='chi'>
							<i className='iconfont icon-canyin'></i>
						</Button>
						<div className='disc'>吃饭</div>
					</div>
					<div className='item'>
						<Button variant="contained" className='zhu'>
							<i className='iconfont icon-zhusu'></i>
						</Button>
						<div className='disc'>住宿</div>
					</div>
					<div className='item'>
						<Button variant="contained" className='xin'>
							<i className='iconfont icon-feiji'></i>
						</Button>
						<div className='disc'>出行</div>
					</div>
					<div className='item'>
						<Button variant="contained" className='you'>
							<i className='iconfont icon-jingdian'></i>
						</Button>
						<div className='disc'>景点</div>
					</div>
					<div className='item'>
						<Button variant="contained" className='gou'>
							<i className='iconfont icon-listgouwu'></i>
						</Button>
						<div className='disc'>购物</div>
					</div>
					<div className='item'>
						<Button variant="contained" className='yu'>
							<i className='iconfont icon-wuxianwangluo'></i>
						</Button>
						<div className='disc'>娱乐</div>
					</div>
				</div>
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderFooter={() => (<div style={{textAlign: 'center' }}>

						{this.state.isLoading ? <ActivityIndicator animating /> : 'Loaded'}
					</div>)}
					renderRow={row}
					className="am-list"
					pageSize={4}
					useBodyScroll
					onScroll={() => { console.log('scroll'); }}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
				/>

				<Button variant="contained" className='btn'>
					Default
				</Button>
				<Button variant="contained" color="primary" className={classes.button}>
					Primary
				</Button>
				<Button variant="contained" color="secondary" className={classes.button}>
					Secondary
				</Button>
				<Button variant="contained" color="secondary" disabled className={classes.button}>
					Disabled
				</Button>
				<Button variant="contained" href="#contained-buttons" className={classes.button}>
					Link
				</Button>
				<input
					accept="image/*"
					className={classes.input}
					id="contained-button-file"
					multiple
					type="file"
				/>
				<label htmlFor="contained-button-file">
					<Button variant="contained" component="span" className={classes.button}>
						Upload
					</Button>
				</label>
			</div>
		);
	}

}

App.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
