// Hide a secret!
function caesar(solve = false, word, shift = 100, alpha = "abcdefghijklmnopqrstuvwxyz" ) {
	let hidden = '';
	let wordArr = [...word];
	shift = parseInt(shift);
	if ( typeof word !== 'string' || word.constructor !== String ) return false; // pass string only
	
	// loop over letters in word and replace with a new letter (not random, but staggered)
	wordArr.forEach( (letter, index) => { 
		if ( letter === ' ' ) { hidden += ' '; return; } // don't change spaces
		let newLoc;
		let loc = alpha.indexOf(letter);		
		// if solving, need to go backwards
		if ( solve === true ) {
			newLoc = ( loc - shift ) % alpha.length;
			// wrapping back around
			if ( newLoc < 0 ) {
					newLoc = alpha.length + newLoc;
			}
		}
		else {
			// simpler when we are obfuscating it!
			newLoc = ( loc + shift ) % alpha.length;
		}		
		hidden += alpha[newLoc]; // build up result
	});
	return hidden;
}

// Get the obfuscated word...
const guessingSecret = caesar(false, 'Hello World', 5000);
console.warn( `SECRET HIDDEN: ${guessingSecret}` );

// Reveal the secret!
const finalResult = caesar(true, guessingSecret, 5000);
console.error( `SECRET DECODED: ${finalResult}` );

/* Note
The 'shift' values must be the same for this to work - this is the key value which you will have shared with your co-conspirator! 
You could attempt to brute-force this by looping the function X times where X is the shift value, similar to attacking a password hash.
*/

// Vue Stuff
Vue.component('caesar-cipher', {
  data() {
    return {
			toggle : false,
			shift : 13,
			possible : 'abcdefghijklmnopqrstuvwxyz',
			encode : 'Encode something!',
			encoded : 'Secrets'
    }
  },
	methods : {
		checkboxToggle() {
			this.toggle = !this.toggle;
		}
	},
	computed : {
		status : function() {
			if ( this.toggle ) {
					return 'Decode';
			}
			else {
					return 'Encode';
			}
		},
		encodeString : function() {
			if ( this.toggle ) {
				return caesar(false, this.encode, this.shift, this.possible);			
			}
			else {
				return caesar(true, this.encode, this.shift, this.possible);
			}
		}
	}
});
new Vue({
		el: '#app'
});