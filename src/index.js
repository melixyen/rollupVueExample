import Puk from './components/puk';
import Confirm from './components/popup';
import Alert from './components/alert';

const components = [Puk, Confirm, Alert];

let lui = {}
const PRE_NAME = 'lui-';

lui.listComponent = [];

const install = function(Vue){
	components.forEach((c)=>{
		var cmpName = PRE_NAME + c.name;
		Vue.component(cmpName, c);
		if(typeof(c.install)=='function') c.install(Vue);
		if(typeof(c.mainFunction)=='function') lui[c.name] = c.mainFunction;
		lui.listComponent.push(cmpName);
	})
}

if(typeof(window) !== 'undefined' && window.Vue){
	install(window.Vue);
}

lui.install = install;

export default lui;