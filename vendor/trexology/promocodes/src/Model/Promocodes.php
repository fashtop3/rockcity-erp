<?php

namespace Trexology\Promocodes\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class Promocodes extends Model
{

	protected $guarded = [
    	'created_at','updated_at'
  	];

  protected $table = 'promocodes';

  public $rules = [
    'code' => 'required'
  ];

	/**
     * Generated codes will be saved here
     * to be validated later
     *
	 * @var array
	 */
	// protected $codes = [];

	/**
     * Length of code will be calculated
     * from asterisks you have set as
     * mas in your config file
     *
	 * @var int
	 */
	protected $length;

	/**
	 * Promocodes constructor.
	 */
	public function __construct()
	{
		$this->length = substr_count(config('promocodes.mask'), '*');
		parent:: __construct();
	}

	/**
     * Here will be generated single code
     * using your parameters from config
     *
	 * @return string
	 */
	public static function randomize()
	{
		$instance = (new static);
		$characters = config('promocodes.characters');
		$separator  = config('promocodes.separator');
		$mask       = config('promocodes.mask');
		$prefix     = config('promocodes.prefix');
		$suffix     = config('promocodes.suffix');

		$random = [];
		$code   = '';

		for ($i = 1; $i <= $instance->length; $i++) {
			$character = $characters[rand(0, strlen($characters) - 1)];
			$random[]  = $character;
		}

		shuffle($random);

		if ($prefix !== false) {
			$code .= $prefix . $separator;
		}

		for ($i = 0; $i < count($random); $i++) {
			$mask = preg_replace('/\*/', $random[$i], $mask, 1);
		}

		$code .= $mask;

		if ($suffix !== false) {
			$code .= $separator . $suffix;
		}

		return $code;
	}


	// /**
  //    * Your code will be validated to
  //    * be unique for one request
  //    *
	//  * @param $collection
	//  * @param $new
	//  *
	//  * @return bool
	//  */
	public static function validate($new)
	{
		$count = Promocodes::where('code', $new)->count();

		if ($count == 1) {
			return true;
		}
		else{
			return false;
		}
	}

	/**
     * Generates promocodes as many as you wish
     *
	 * @param int $amount
	 *
	 * @return array
	 */
	public static function generate($amount = 1)
	{
		$collection = [];

		for ($i = 1; $i <= $amount; $i++) {
			$random = static::randomize();
			while (static::validate($random)) {
				dd('exists');
				$random = static::randomize();
			}

			$collection[] = $random;
		}

		return $collection;
	}

	/**
	 * Save promocodes into database
     * Successfull insert returns generated promocodes
     * Fail will return NULL
	 *
	 * @param int $amount
	 *
	 * @return static
	 */
	public static function generateAndSave($amount = 1, $reward = null, $type = null, $expiry_date = null, $quantity = -1)
	{
		$data = collect([]);

		foreach (static::generate($amount) as $key => $code) {
			$promo = new Promocodes();
			$promo->code = $code;
			$promo->reward = $reward;
			$promo->type = $type;
			$promo->expiry_date = $expiry_date;
			$promo->quantity = $quantity;
			$promo->save();
			$data->push($promo);
		}

		return $data;
	}

	/**
		 * Generates promocodes with specific code
		 *
	 * @param string $code
	 * @param double $reward
	 *
	 * @return Promocodes / false
	 */
	public static function generateCodeName($code, $reward = null, $type = null, $expiry_date = null, $quantity = -1)
	{
		$instance = (new static);

		if (!static::validate($code)) {
			$instance->code = $code;
			$instance->reward = $reward;
			$instance->type = $type;
			$instance->expiry_date = $expiry_date;
			$instance->quantity = $quantity;
			$instance->save();
			return $instance;
		}
		else{
			return false;
		}
	}

	/**
     * Check promocode in database if it is valid
     *
	 * @param $code
	 *
	 * @return bool
	 */
	public static function check($code, $type)
	{
		return Promocodes::where('code', $code)->where('type', $type)
			// ->whereNull('is_used')
			->where('quantity', '!=' , 0)
			->where(function($q) {
				$q->whereDate('expiry_date', '>' , Carbon::today())
					->orWhereNull('expiry_date');
			})
			->count() > 0;
	}

	public static function reward($code)
	{
		return Promocodes::where('code', $code)
			// ->whereNull('is_used')
			->where('quantity', '!=' , 0)
			->where(function($q) {
				$q->whereDate('expiry_date', '>' , Carbon::today())
					->orWhereNull('expiry_date');
			})->first()->reward;
	}

	/**
     * Apply promocode to user that it's used from now
     *
	 * @param $code
	 *
	 * @return bool
	 */
	public static function apply($code, $hard_check = false)
	{
		$record = Promocodes::where('code', $code)
			// ->whereNull('is_used')
			->where('quantity', '!=' , 0) // -1 for infinite
			->where(function($q) {
				$q->whereDate('expiry_date', '>' , Carbon::today())
					->orWhereNull('expiry_date');
			})//->toSql();
			->first();

		//
		if ($record) {

			if ($record->quantity > 0) {
				$record->quantity--;
			}
			// $record->is_used = date('Y-m-d H:i:s');

			if ($record->save()) {
				if ($hard_check) {
					return $record->reward;
				} else {
					return true;
				}
			}
		}

		return false;
	}
}
