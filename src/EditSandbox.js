/**
 * Script para que o link para a página de testes da Wikipédia abra a primeira que estiver vazia
 * @author: [[User:Helder.wiki]]
 * @tracking: [[Special:GlobalUsage/User:Helder.wiki/Tools/EditSandbox.js]] ([[File:User:Helder.wiki/Tools/EditSandbox.js]])
 */
/*jslint browser: true, white: true, devel: true, plusplus: true */
/*global mediaWiki, jQuery, injectSpinner */
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
				location.href = mw.util.wikiGetlink( page.title ) + '?action=edit';
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
	injectSpinner( $('#n-testpage').get(0), 'testpage' );
	$.ajax({
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
	})
	.done( findFreeSandBoxAndGo )
	.fail( function() {
		alert( 'Houve um erro ao usar AJAX para obter o conteúdo das páginas de testes.' );
	});
}

$(function(){
	$('#n-testpage')
		.click( getSandoBoxesContent )
		.find('a').attr('href', mw.util.wikiGetlink( 'WP:Página de testes/1' ) + '?action=edit');
});

}( mediaWiki, jQuery ) );