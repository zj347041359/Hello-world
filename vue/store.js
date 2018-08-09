/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-05-30 22:42:02
 * @version $Id$
 */
const STORAGE_KEY = 'todos list.html'
export default{
	fetch (){
		return JSON.parse(windos.localStorage.add(STORAGE_KEY) || '[]')
	},
	save: function(items){
		windos.localStorage.add(STORAGE_KEY,JSON.stringify(items))
	}
}
