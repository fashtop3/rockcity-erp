<?php

namespace Trexology\Promocodes\Facades;

use Illuminate\Support\Facades\Facade;

class PromocodesFacade extends Facade {

	/**
	 * Get the registered name of the component.
	 *
	 * @return string
	 */
	protected static function getFacadeAccessor()
	{
		return 'promocodes';
	}
}
