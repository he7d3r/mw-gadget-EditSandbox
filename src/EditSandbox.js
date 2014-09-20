/**
 * Script para que o link para a página de testes da Wikipédia abra a primeira que estiver vazia
 * @author: Helder (https://github.com/he7d3r)
 * @license: CC BY-SA 3.0 <https://creativecommons.org/licenses/by-sa/3.0/>
 */
/*jslint browser: true, white: true, devel: true, plusplus: true */
/*global mediaWiki, jQuery */
( function ( mw, $ ) {
'use strict';

function findFreeSandBoxAndGo ( data ) {
	var page, i,
		query = data.query;
	if ( data.error !== undefined ) {
		alert( 'Erro da API: ' + data.error.code + '. ' + data.error.info );
	} else if ( query && query.pages && query.pageids ) {
		for( i = 0; i < query.pageids.length; i++ ){
			page = query.pages[ query.pageids[i] ];
			if( page.revisions[0]['*'].length === 142 ){
				location.href = mw.util.getUrl( page.title ) + '?action=edit';
				return true;
			}
		}
		alert( 'Todas as páginas de teste estão ocupadas' );
	} else {
		alert( 'Houve um erro desconhecido ao consultar a API da Wikipédia' );
	}
}

function getSandoBoxesContent(e){
	if( e.which !== 1 /* left button */ ){
		return;
	}
	e.preventDefault();
	$( '#n-testpage' ).injectSpinner( 'testpage' );
	$.ajax( {
		url: mw.util.wikiScript( 'api' ),
		dataType: 'json',
		data: {
			'format': 'json',
			'action': 'query',
			'titles': 'Wikipédia:Página de testes/1|Wikipédia:Página de testes/2|Wikipédia:Página de testes/3|Wikipédia:Página de testes/4',
			'prop': 'revisions',
			'rvprop': 'content',
			'indexpageids': '1'
		}
	} )
	.done( findFreeSandBoxAndGo )
	.fail( function() {
		alert( 'Houve um erro ao usar AJAX para obter o conteúdo das páginas de testes.' );
	} );
}

$( function(){
	$( '#n-testpage' )
		.click( function(){
			mw.loader.using( [ 'jquery.spinner' ], getSandoBoxesContent );
		} )
		.find( 'a' ).attr( 'href', mw.util.getUrl( 'WP:Página de testes/1' ) + '?action=edit' );
} );

}( mediaWiki, jQuery ) );